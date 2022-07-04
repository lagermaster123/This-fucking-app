module.exports.address = [
    {
        type: 'text',
        label: 'First Name',
        name: 'firstName',
        pattern: '[A-Za-z ]{1,32}',
        errorMessage: 'Invalid First Name',
        required: true
    },
    {
        type: 'text',
        label: 'Last Name',
        name: 'lastName',
        pattern: '[A-Za-z ]{1,32}',
        errorMessage: 'Invalid Last Name',
        required: true
    },
    {
        type: 'text',
        label: 'Address Line 1',
        name: 'addressLine1',
        pattern: '[A-Za-z0-9 ]{1,32}',
        errorMessage: 'Invalid Address Line 1',
        required: true
    },
    {
        type: 'text',
        label: 'Address Line 2',
        name: 'addressLine2',
        pattern: '[A-Za-z0-9 ]{1,32}',
        errorMessage: 'Invalid Address Line 2',
        required: false
    },
    {
        type: 'text',
        label: 'City',
        name: 'city',
        pattern: `^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$`,
        errorMessage: 'Invalid City',
        required: true
    },
    {
        type: 'text',
        label: 'State',
        name: 'state',
        pattern: '[A-Za-z]{1,32}',
        errorMessage: 'Invalid State',
        required: true
    },
    {
        type: 'number',
        label: 'Zip',
        name: 'zip',
        pattern: '[0-9]{5}',
        errorMessage: 'Invalid Zip',
        required: true
    },
]