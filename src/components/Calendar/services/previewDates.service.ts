import { DateValue } from '@internationalized/date';
import { RangeValue } from '@react-types/shared';

import { SubjectManager } from '../../../utilities/subject-manager.utilies';

export type PreviewDates = DateValue | RangeValue<DateValue> | null;

export const previewDatesService = new SubjectManager<PreviewDates>();
