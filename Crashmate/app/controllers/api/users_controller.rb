class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = User.all
  end

  def update
    @user = User.find(params[:id])
    @user.group_id = params[:group_id]
    @user.save!
    render :show
  end

  private
  def user_params
    params.require(:user).permit(
      :password,
      :username,
      :about,
      :amenities,
      :budget,
      :cats,
      :city,
      :date,
      :dogs,
      :term,
      :age,
      :gender,
      :occupation
    )
  end
end
