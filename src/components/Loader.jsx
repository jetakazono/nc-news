export const Loader = ({ className = '', width = 44, height = 44, color = "#4b5563", fixed = false, disattached = false}) => {

    const classNameByVariant = !disattached ? 'left-0 right-0 top-0 bottom-0' : ''
    
    const isFixed = fixed ? 'fixed' : 'absolute'

    return ( 
        <div className={`${className} ${classNameByVariant} ${isFixed} z-50 bg-white bg-opacity-80 transition flex items-center justify-center`}>
            <svg width={width} height={height} viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke={color}>
                <g fill="none" fill-rule="evenodd" stroke-width="2">
                    <circle cx="22" cy="22" r="1">
                        <animate attributeName="r"
                            begin="0s" dur="1.8s"
                            values="1; 20"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.165, 0.84, 0.44, 1"
                            repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity"
                            begin="0s" dur="1.8s"
                            values="1; 0"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.3, 0.61, 0.355, 1"
                            repeatCount="indefinite" />
                    </circle>
                    <circle cx="22" cy="22" r="1">
                        <animate attributeName="r"
                            begin="-0.9s" dur="1.8s"
                            values="1; 20"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.165, 0.84, 0.44, 1"
                            repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity"
                            begin="-0.9s" dur="1.8s"
                            values="1; 0"
                            calcMode="spline"
                            keyTimes="0; 1"
                            keySplines="0.3, 0.61, 0.355, 1"
                            repeatCount="indefinite" />
                    </circle>
                </g>
            </svg>
        </div>
    )
}