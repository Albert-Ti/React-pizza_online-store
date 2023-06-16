import React from "react"
import ContentLoader from "react-content-loader"

const Sceleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f9f5f5"
    foregroundColor="#ecebeb"
  >
    <circle cx="125" cy="125" r="125" />
    <rect x="0" y="277" rx="6" ry="6" width="260" height="23" />
    <rect x="0" y="317" rx="5" ry="5" width="260" height="71" />
    <rect x="0" y="409" rx="4" ry="4" width="101" height="32" />
    <rect x="120" y="403" rx="18" ry="18" width="140" height="44" />
  </ContentLoader>
)

export default Sceleton

