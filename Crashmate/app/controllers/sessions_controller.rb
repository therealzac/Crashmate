class SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      sign_in(@user)
      render :show
    else
      render json: ["Invalid username or password."], status: 422
    end
  end

  def show
    @user = current_user
    if @user
      render :show
    else
      render :blank
    end
  end

  def destroy
    sign_out
    render :blank
  end
end
