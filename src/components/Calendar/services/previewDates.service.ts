import { DateValue } from '@internationalized/date';
import { RangeValue } from '@react-types/shared';
import { BehaviorSubject } from 'rxjs';

export type PreviewDates = DateValue | RangeValue<DateValue> | null;

export const previewDatesService = new BehaviorSubject<PreviewDates>(null);
