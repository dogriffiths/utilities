import TableRow from "./relish-core/TableRow";

function table(s: TemplateStringsArray) {
    let input = s
        .toString()
        .split("\n")
        .map(i => i.trim())
        .filter(i => i)
        .map(r =>
            r
                .split("|")
                .slice(1, -1)
                .map(d => d.trim())
        );
    const [keys, ...values] = input;

    let map: TableRow[] = values.map(row =>
        keys.reduce((obj, key, index) => {
            // @ts-ignore
            obj[key] = row[index];
            return new TableRow(obj);
        // }, new TableRow([]))
        }, {} as TableRow)
    );
    return map;
}

const stringSized = (n: number): string => Array(n + 1).join("x");

export { table, stringSized };
