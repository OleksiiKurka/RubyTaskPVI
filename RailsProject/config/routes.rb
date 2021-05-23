Rails.application.routes.draw do
  
  post "/user", to: "user#create"
  post "/login", to: "user#login"
  get "/auto_login", to: "user#auto_login"

  namespace :api do
    namespace :v1 do
      resources :comments
      resources :tags
      resources :posts
      get "userPosts", to: "posts#showUserPosts"
      get "categories", to: "categories#index"
    end
  end
end
