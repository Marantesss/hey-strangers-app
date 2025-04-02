import { SportModel } from '@/domains/sports/shared/models/Sport.model'
import { FieldAmenity, Field as PayloadField } from '@payload-types'
import { FieldTypeModel } from './FieldType.model'
import { FieldFlooringModel } from './FieldFlooring.model'
import { FieldAmenityModel } from './FieldAmmenity.model'
import { CityModel } from '@/domains/cities/shared/models/City.model'

export class FieldModel {
  readonly id: string
  readonly name: string
  readonly address: string

  readonly createdAt: Date
  readonly updatedAt: Date

  // Relations
  private readonly _sportId: string
  private readonly _sport?: SportModel

  private readonly _cityId: string
  private readonly _city?: CityModel

  private readonly _typeId: string
  private readonly _type?: FieldTypeModel

  private readonly _flooringId: string
  private readonly _flooring?: FieldFlooringModel

  private readonly _amenities?: FieldAmenityModel[]
  private readonly _amenitiesIds?: string[]

  private constructor(data: PayloadField) {
    this.id = data.id
    this.name = data.name
    this.address = data.address

    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)

    this._sport = data.sport instanceof Object ? SportModel.from(data.sport) : undefined
    this._sportId = data.sport instanceof Object ? data.sport.id : data.sport

    this._city = data.city instanceof Object ? CityModel.from(data.city) : undefined
    this._cityId = data.city instanceof Object ? data.city.id : data.city

    this._type = data.type instanceof Object ? FieldTypeModel.from(data.type) : undefined
    this._typeId = data.type instanceof Object ? data.type.id : data.type

    this._flooring =
      data.flooring instanceof Object ? FieldFlooringModel.from(data.flooring) : undefined
    this._flooringId = data.flooring instanceof Object ? data.flooring.id : data.flooring

    const isAmenitiesExpanded = data.amenities?.length ? data.amenities[0] instanceof Object : false

    this._amenities = data.amenities
      ? isAmenitiesExpanded
        ? data.amenities.map((amenity) => FieldAmenityModel.from(amenity as FieldAmenity))
        : []
      : undefined

    this._amenitiesIds = data.amenities
      ? isAmenitiesExpanded
        ? this._amenities?.map(({ id }) => id)
        : (data.amenities as string[])
      : undefined
  }

  get type(): FieldTypeModel {
    if (!this._type) {
      throw new Error('Type not found')
    }
    return this._type
  }

  get flooring(): FieldFlooringModel {
    if (!this._flooring) {
      throw new Error('Flooring not found')
    }
    return this._flooring
  }

  get amenities(): FieldAmenityModel[] {
    if (!this._amenities) {
      throw new Error('Amenities not found')
    }
    return this._amenities
  }

  // Factory method
  static from(data: PayloadField): FieldModel {
    return new FieldModel(data)
  }

  public toSerializable(): PayloadField {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      city: this._city ? this._city.toSerializable() : this._cityId,
      type: this._type ? this._type.toSerializable() : this._typeId,
      flooring: this._flooring ? this._flooring.toSerializable() : this._flooringId,
      sport: this._sport ? this._sport.toSerializable() : this._sportId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      amenities: this._amenities
        ? this._amenities.map((amenity) => amenity.toSerializable())
        : this._amenitiesIds,
    }
  }
}
