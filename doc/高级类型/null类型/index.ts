function fn(str: string | null): string {
    return str || "def"
}

function broken(name: string | null): string {
    function postfix(ep: string) {
        return name!.charAt(0) + "---" + ep //这里加入感叹号，用类型断言推算  这里也是就是告知编辑器，这里不会成为null
    }
    name = name || 'def'
    return postfix(name)
}