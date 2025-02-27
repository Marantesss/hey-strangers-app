import { PropsWithChildren } from "react";

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default AppLayout;