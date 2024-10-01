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
