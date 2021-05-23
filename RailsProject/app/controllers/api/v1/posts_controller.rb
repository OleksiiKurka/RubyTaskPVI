class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  def showUserPosts
    @posts = Post.find(@user.id)
    render json: @posts
  end 

  # POST /posts
  def create

    @post = Post.new(
    title:post_params[:title],
    body:post_params[:body],
    category_id:post_params[:category_id],
    user_id:@user.id)
   
   
    
    
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
    
    params[:tags].each do |n|
       Tag.create(tag: n, post_id:@post.id)
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params,user_id:@user.id)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body, :category_id)
    end
end
