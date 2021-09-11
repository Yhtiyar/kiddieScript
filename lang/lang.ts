import { assert } from "console"

export interface Expression {
    evaluate: () => Value
    display: () => string

}

export abstract class Value implements Expression {
    evaluate(): Value {
        return this
    }
    abstract display(): string
}

export class KsNumber extends Value {
    constructor(protected inner_value: number) {
        super()
    }

    display(): string {
        return `(Number: ${this.inner_value.toString()})`
    }
    toString(): string {
        return `${this.inner_value.toString()}`
    }

    static add(left: KsNumber, right: KsNumber): KsNumber {
        return new KsNumber(left.inner_value + right.inner_value)
    }
    static subtract(left: KsNumber, right: KsNumber): KsNumber {
        return new KsNumber(left.inner_value - right.inner_value)
    }
}

export class KsString extends Value {
    constructor(protected inner_value: string) {
        super()
    }

    display(): string {
        return `(String: ${this.inner_value.toString()})`
    }
    toString(): string {
        return `"${this.inner_value.toString()}"`
    }

    static add(left: KsString, right: KsString): KsString {
        return new KsString(left.inner_value + right.inner_value)
    }
}

export abstract class BinaryOperator implements Expression {
    constructor(protected left: Expression, protected right: Expression, protected operator_sign: string) {

    }
    abstract evaluate(): Value

    display(): string {
        return `(${this.left.display()}${this.operator_sign}${this.right.display()})`
    }

    toString(): string {
        return `(${this.left.toString()}${this.operator_sign}${this.right.toString()})`
    }
}

export class KsPlus extends BinaryOperator {
    constructor(left: Expression, right: Expression) {
        super(left, right, "+")
    }

    evaluate(): Value {
        let left_evaluated = this.left.evaluate()
        let right_evaluated = this.right.evaluate()


        if (left_evaluated instanceof KsNumber) {
            if (!(right_evaluated instanceof KsNumber)) {
                throw new Error("Cannot add number with" + right_evaluated)
            }
            return KsNumber.add(left_evaluated as KsNumber, right_evaluated as KsNumber)
        }

        if (left_evaluated instanceof KsString) {
            if (!(right_evaluated instanceof KsString)) {
                throw new Error("Cannot add string with" + right_evaluated)
            }
            return KsString.add(left_evaluated as KsString, right_evaluated as KsString)
        }

        throw new Error("unknown value:" + left_evaluated)

    }
}

export class KsMinus extends BinaryOperator {
    constructor(left: Expression, right: Expression) {
        super(left, right, "-")
    }

    evaluate(): Value {
        let left_evaluated = this.left.evaluate()
        let right_evaluated = this.right.evaluate()


        if (left_evaluated instanceof KsNumber) {
            if (!(right_evaluated instanceof KsNumber)) {
                throw new Error("Cannot subtract number with" + right_evaluated)
            }
            return KsNumber.subtract(left_evaluated as KsNumber, right_evaluated as KsNumber)
        }

        if (left_evaluated instanceof KsString) {
            throw new Error("You cannot subtract strings")
        }

        throw new Error("unknown value:" + left_evaluated)

    }
}


let exp = new KsPlus(new KsPlus(new KsNumber(2), new KsNumber(4)), new KsMinus(new KsNumber(5), new KsNumber(3)))

//(2 + 4) + (5 - 3)
console.log(exp.display())

console.log(exp.evaluate())
console.log(exp.toString())