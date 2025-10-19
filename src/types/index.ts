export interface Game {
  uuid: string;
  name: string;
  steam_id: string;
  header_image_url: string;
  capsule_image_url: string;
  library_image_url: string;
  time_of_last_cover_fetch: number;
  steam_grid_db_missing: boolean;
  capsule_filename: string;
}

export interface Cover {
  uuid: string;
  game_uuid: string;
  url: string;
  thumb: string;
  style?: CoverStyle;
  width: number;
  height: number;
}

export type CoverStyle = "alternate" | "white_logo" | "no_logo" | "material" | "blurred";