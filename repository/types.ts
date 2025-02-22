export interface DataLookup {
  id?: string;
  type?: string;
  name?: string;
  value?: string;
  description?: string;
  category?: string;
  note?: string;
  index?: number;
  is_default?: boolean;
  is_active?: boolean;
  remark?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Metadata {
  limit?: number;
  offset?: number;
  total?: number;
  next?: string;
  previous?: string;
}

export interface UserAccount {
  id?: string;
  full_name?: string;
  phone_number?: string;
  email?: string;
  role?: string;
  created_at:   Date;
  updated_at:   Date;
}


export interface ErrorResponse {
  type?: ErrorTypes;
  errors?: ErrorResponseItem[];
}

export interface ErrorResponseItem {
  code?: string;
  detail?: string;
  attr?: string;
}

// Auth module
export interface RegistrationDto {
  full_name: string;
  email:     string;
  password:  string;
}

export interface RegistrationResponse {
  success: string;
}

// Game module
export interface Competition {
  id:                   string;
  name:                 string;
  min_entry_fee:        string;
  max_entry_fee:        string;
  max_players:          number;
  max_score_per_player: number;
  start_time:           Date;
  end_time:             Date;
  type:                 DataLookup;
  ranking_method:       DataLookup;
  tiebreaker_rule:      DataLookup;
  created_by:           UserAccount;
  created_at:           Date;
  updated_at:           Date;
}

export interface CompetitionListResponse {
  results?: Competition[];
  metadata?: Metadata
}

// Competition Entry
export interface CompetitionEntryDto {
  entry_fee:   string;
  competition: string;
}

export interface CompetitionEntry {
  id:          string;
  entry_fee:   string;
  competition: string;
  player:      UserAccount;
  created_at:  Date;
  updated_at:  Date;
}

// Leaderboard
export interface LeaderBoard {
  rank:              number;
  player_identifier: string;
  player_name:       string;
  highest_score:     number;
  total_entries:     number;
}

export interface LeaderBoardResponse {
  results?: LeaderBoard[];
  metadata?: Metadata
}


// System Settings
export interface SystemSetting {
  id?: string;
  name?: string;
  key?: DataLookup;
  value_unit?: DataLookup;
  data_type?: DataLookup;
  current_value?: string;
  data_scheme?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SystemSettingDto {
  name?: string;
  key?: string;
  value_unit?: string;
  data_type?: string;
  current_value?: string;
  data_scheme?: string;
}

export interface SystemSettingListResponse {
  results?: SystemSetting[];
  metadata?: Metadata;
}

export interface LookupListResponse {
  results?: DataLookup[];
  metadata?: Metadata;
}

export enum ErrorTypes {
  VALIDATION_ERROR = "validation_error",
  CLIENT_ERROR = "client_error",
  SERVER_ERROR = "server_error",
}
