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
    if params[:user]
      @user.age = params[:user][:age]
      @user.city = params[:user][:city]
      @user.date = params[:user][:date]
      @user.budget = params[:user][:budget]
      @user.term = params[:user][:term]
      @user.dogs = params[:user][:dogs]
      @user.cats = params[:user][:cats]
      @user.amenities = params[:user][:amenities]
      @user.about = params[:user][:about]
      @user.gender = params[:user][:gender]
      @user.occupation = params[:user][:occupation]
      @user.group_id = params[:user][:group_id]
      @user.profile_pic = params[:user][:profile_pic]
    else
      @user.group_id = params[:group_id]
    end

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
      :occupation,
      :group_id,
      :profile_pic
    )
  end
end
