import type { BuildingOption } from '@project-rouge/service-cost-client/src/data/building';

export type KitOptionDomainModel = {
  readonly id: string;
  readonly source_id: string;
  readonly source_updated_at: Date;

  readonly option_group_and_value: BuildingOption;
  readonly is_default_option_value: boolean;

  readonly base_build_element_reference_ids: string[] | null;
  readonly module_element_reference_ids: string[] | null;

  readonly created_at: Date;
};
