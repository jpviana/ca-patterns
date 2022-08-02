export interface ImputFindCustomerDto {
    id: string;
}

export interface OutputFindCustomerDto {
    id: string,
    name: string,
    address: {
        street: string,
        number: number,
        zip: string,
        city: string
    }
}