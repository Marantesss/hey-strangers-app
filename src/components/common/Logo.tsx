export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Logo: React.FC<LogoProps> = ({ alt = 'Hey Strangers Logo', style, ...props }) => {
  return <img src="/logo.svg" alt={alt} width={209} height={34} {...props} />
}

export default Logo
