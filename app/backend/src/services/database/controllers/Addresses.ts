import Controller from './Controller';

export class Addresses extends Controller {
  static flattenRecord(record) {
    return {
      id: record.id,
      postcode: record.postcode,
      city_name: record.city.name,
      country_name: record.city.country.name,
      country_short_name: record.city.country.short_name,
      long_street: record.long_street
    };
  }

  async findAll({ transaction }) {
    const addresses = await this.models.Addresses.query(transaction).eager(
      'city.country'
    );

    return addresses.map(dbRecord => {
      const flattenedDbRecord = Addresses.flattenRecord(dbRecord);

      return this.recordPreparator.prepareDbRecordForReturn(flattenedDbRecord);
    });
  }
}
