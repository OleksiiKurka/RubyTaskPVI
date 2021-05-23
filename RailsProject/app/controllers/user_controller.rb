class UserController < ApplicationController
    before_action :authorized, only: [:auto_login]
  
    
    def create
      @user = User.create(user_params)
      if @user.valid?
        token = encode_token({user_id: @user.id})
        render json: {user: @user, token: token}
      else
        render json: {error: "Invalid username or password"},status: :bad_request
      end
    end
  
    
    def login
      @user = User.find_by(email: params[:email])
  
      if @user && @user.authenticate(params[:password])
        token = encode_token({user_id: @user.id})
        render json: {user: @user, token: token}
      else
        render json: {error: "Invalid username or password"},status: :bad_request
      end
    end
  
  
    def auto_login
      render json: @user
    end
  
    private
  
    def user_params
     params.permit(:first_name, :last_name, :password, :email, :age, :about, :role_id)
    end
  
  end