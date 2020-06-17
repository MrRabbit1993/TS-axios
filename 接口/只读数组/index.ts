let abc: number[] = [1, 2, 3, 4]
let roa: ReadonlyArray<number> = abc;//泛型只读数组
roa[0] =1 //报错
roa.push(2)//报错
abc = roa //报错
let roa1:readonly number[] = abc
 