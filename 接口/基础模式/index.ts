function f1(obj: { label: string }) {
    console.log(obj.label)
}
f1({ label: "hello" })

interface Label {
    label: string
}
function f2(obj: Label) {
    console.log(obj.label)
}
f2({ label: "world" })