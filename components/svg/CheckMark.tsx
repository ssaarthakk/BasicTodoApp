import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CheckMark(props: any) {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 0 16 16"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15.414 4.914L6 14.33.586 8.913l2.828-2.828L6 8.672l6.586-6.586 2.828 2.828z"
        fill="#fff"
      />
    </Svg>
  )
}

export default CheckMark;