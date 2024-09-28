import { NextFunction } from 'express';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

export const getNextCodePlugin = (schema: any) => {
  schema.pre('save', async function (next: NextFunction) {
    if (!this.code) {
      try {
        const doc = await this.constructor.aggregate([
          { $match: { tenant_id: this.tenant_id } },
          { $group: { _id: '_id', maxCode: { $max: '$code' } } },
        ]);
        const nextId = (doc.length > 0 ? doc[0].maxCode : 0) + 1;
        // Find and increment the sequence
        this.code = nextId;
      } catch (error) {
        return next(error);
      }
    }
    return next();
  });
};
