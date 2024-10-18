import { expect } from 'chai';

import { buildMeta } from '../../src/utils/pagination';

describe('buildMeta', () => {
  it('should return correct meta data when total is divisible by pageSize', () => {
    const pagination = { page: 1, pageSize: 10 };
    const total = 50;

    const result = buildMeta(pagination, total);

    expect(result).to.deep.equal({
      page: 1,
      pageSize: 10,
      total: 50,
      totalPages: 5
    });
  });

  it('should return correct meta data when total is not divisible by pageSize', () => {
    const pagination = { page: 2, pageSize: 3 };
    const total = 10;

    const result = buildMeta(pagination, total);

    expect(result).to.deep.equal({
      page: 2,
      pageSize: 3,
      total: 10,
      totalPages: 4
    });
  });

  it('should handle zero total correctly', () => {
    const pagination = { page: 1, pageSize: 10 };
    const total = 0;

    const result = buildMeta(pagination, total);

    expect(result).to.deep.equal({
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0
    });
  });

  it('should handle case when total is smaller than pageSize', () => {
    const pagination = { page: 1, pageSize: 10 };
    const total = 5;

    const result = buildMeta(pagination, total);

    expect(result).to.deep.equal({
      page: 1,
      pageSize: 10,
      total: 5,
      totalPages: 1
    });
  });

  it('should handle large page numbers correctly', () => {
    const pagination = { page: 100, pageSize: 20 };
    const total = 1000;

    const result = buildMeta(pagination, total);

    expect(result).to.deep.equal({
      page: 100,
      pageSize: 20,
      total: 1000,
      totalPages: 50
    });
  });
});
