export type Expression = {
  expression_id: number;
  user_id: string;
  user_name: string;
  avatar_url: string;
  title: string;
  content: string;
  time: string;
};

export type Review = {
  review_id: number;
  expression_id: number;
  user_id: string;
  user_name: string;
  avatar_url: string;
  content: string;
  created_at: string;
};

export type UserProfile = {};

export function CreateExpression(data: any) {
  var expression: Expression = {
    expression_id: data.expression_id,
    user_id: data.user_id,
    user_name: data.user_name,
    avatar_url: data.avatar_url,
    title: data.title,
    content: data.content,
    time: data.time,
  };

  return expression;
}

export function CreateReview(data: any) {
  var expression: Review = {
    review_id: data.review_id,
    expression_id: data.expression_id,
    user_id: data.user_id,
    user_name: data.user_name,
    avatar_url: data.avatar_url,
    content: data.content,
    created_at: data.created_at,
  };

  return expression;
}

export type BlacklistUserItem = {
  owner_user_id: string,
  blocked_user_id: string,
  blocked_user_name: string,
  blocked_user_avatar_url: string
}

export function CreateBlacklisttUserItem(data: any) {
  var blacklistItem: BlacklistUserItem = {
    owner_user_id: data.owner_user_id,
    blocked_user_id: data.blocked_user_id,
    blocked_user_name: data.blocked_user_name,
    blocked_user_avatar_url: data.blocked_user_avatar_url
  };

  return blacklistItem;
}

export type BlacklistExpressionItem = {
  owner_user_id: string,
  blocked_expression_id: number,
  blocked_expression_title: string
}

export function CreateBlacklistExpressionItem(data: any) {
  var blacklistItem: BlacklistExpressionItem = {
    owner_user_id: data.owner_user_id,
    blocked_expression_id: data.blocked_expression_id,
    blocked_expression_title: data.blocked_expression_title
  };

  return blacklistItem;
}