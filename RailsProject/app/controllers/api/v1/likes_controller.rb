class Api::V1::LikesController < ApplicationController
  before_action :set_like, only: [:show, :update]

  # GET /likes
  def index
    @likes = Like.all

    render json: @likes
  end

  # GET /likes/1
  def show
    render json: @like
  end

  # POST /likes
  def create
    @like = Like.new(
      post_id: like_params[:post_id],
      user_id:@user.id)

    if @like.save
      render json:{message: "Created like"} , status: :created
    else
      render json:{message: "Faild to Create like"} , status: :unprocessable_entity
    end
  end

  # PATCH/PUT /likes/1
  def update
    if @like.update(like_params)
      render json: @like
    else
      render json: @like.errors, status: :unprocessable_entity
    end
  end

  # DELETE /likes/1
  def destroy
      @likes = Like.where(post_id:params[:post_id],user_id:@user.id)
      
      @likes.destroy_all
      render json:{message: "Delete like"}
   
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_like
      @like = Like.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def like_params
      params.require(:like).permit(:post_id)
    end
end
