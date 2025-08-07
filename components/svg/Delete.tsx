import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Delete(props: any) {
  return (
    <Svg
      width="800px"
      height="800px"
      viewBox="0 -0.5 21 21"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M130.35 216h2.1v-8h-2.1v8zm4.2 0h2.1v-8h-2.1v8zm-6.3 2h10.5v-12h-10.5v12zm2.1-14h6.3v-2h-6.3v2zm8.4 0v-4h-10.5v4H123v2h3.15v14h14.7v-14H144v-2h-5.25z"
        transform="translate(-179 -360) translate(56 160)"
        fill="#fff"
        stroke="none"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </Svg>
  )
}

export default Delete;
