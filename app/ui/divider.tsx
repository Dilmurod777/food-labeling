export default function Divider({height = 1, heightUnits = "px", margin = 10, marginUnits = "px", color = "#000"}) {
    return <div
        className={`w-full`}
        style={{
            height: `${height}${heightUnits}`,
            marginTop: `${margin}${marginUnits}`,
            marginBottom: `${margin}${marginUnits}`,
            backgroundColor: color
        }}
    />
}