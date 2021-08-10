const options = {
    method: 'GET',
    url: 'https://realtymole-rental-estimate-v1.p.rapidapi.com/rentalPrice',
    params: {
        bedrooms: '4',
        squareFootage: '1600',
        compCount: '5',
        bathrooms: '2',
        address: '5500 Grand Lake Drive, San Antonio, TX',
        propertyType: 'Single Family'
    },
    headers: {
        'x-rapidapi-key': '17251af02amsh667b1c264090491p18710cjsn92afa41003fd',
        'x-rapidapi-host': 'realtymole-rental-estimate-v1.p.rapidapi.com'
    }
};