# numeric-input-directive

install via bower

**bower install ngNumericInput**

============================

numeric parameters

1. type: 'integer || decimal'
2. min: '1 || 1.99'
3. max: '10 || 10.99'

examples:

no parameter (no minimum, no maximum, integer(default))
>`<input ng-model="age" type="text" numeric required/>`

>`<input ng-model="age" type="text" numeric="" required/>`
>

with parameter (no minimum, no maximum, but type is whether integer(non decimal) or decimal)
>`<input ng-model="age" type="text" numeric="{type: 'integer'}" required/>`

>`<input ng-model="tax" type="text" numeric="{type: 'decimal'}" required/>`
>

with parameter (with minimum or maximum value)
>`<input ng-model="age" type="text" numeric="{min: 1}" required/>`

>`<input ng-model="tax" type="text" numeric="{max: 10}" required/>`

>`<input ng-model="tax" type="text" numeric="{min:1, max: 10}" required/>`
>

do as you like
>`<input ng-model="tax" type="text" numeric="{type: 'decimal', min: '1.5'}" required/>`

>`<input ng-model="tax" type="text" numeric="{type: 'decimal', min: '1.5', max: '12.7'}" required/>`

>`<input ng-model="age" type="text" numeric="{type: 'integer', min: 0, max: 10}" required/>`
>
