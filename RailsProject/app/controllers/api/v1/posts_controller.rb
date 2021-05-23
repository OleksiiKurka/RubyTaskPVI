class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]
  before_action :checkRole, only: [:update, :destroy]
  # GET /posts
  def index
    @posts = Post.all.order("created_at DESC")

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  def showUserPosts
    @posts = Post.where(user_id:@user.id).order("created_at DESC")
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

      @commetns = Comment.where(post_id:@post.id).order("created_at DESC")
      @commetns.destroy_all
      @post.destroy
      render json: {message:"Deleted"}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    def checkRole 
      if @post.user_id != @user.id && @user.role_id != 1
        render json:  {message:"Access denied"}
        return
      end
    end
    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :body, :category_id)
    end
end
