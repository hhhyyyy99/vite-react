export type FriendProfile = {
  friend_profile_identifier: string,
  friend_profile_group_name_array: string[],
  friend_profile_remark: string,
  friend_profile_user_profile: UserProfile,
}

export interface userProfile {
  user_profile_add_permission: number
  user_profile_birthday: number
  user_profile_face_url: string
  user_profile_gender: number
  user_profile_identifier: string
  user_profile_language: number
  user_profile_level: number
  user_profile_location: string
  user_profile_nick_name: string
  user_profile_role: number
  user_profile_self_signature: string
}