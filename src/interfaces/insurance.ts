export interface INewInsurancePayload {
  status: string;
  beneficiary_id: string;
  insurance_type: number;
  provider_name: string;
  policy_number: string;
  group_number: string;
}

export interface IUpdateInsurancePayload extends INewInsurancePayload {
  insurance_id: string;
}

export interface deleteInsurancePayload {
  insuranceId: string;
  patinetId: string;
}