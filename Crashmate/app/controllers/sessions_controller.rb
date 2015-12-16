class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      sign_in(@user)
      render :show
    else
      render json: ["Invalid username or password :("], status: 422
    end
  end

  def destroy
    sign_out
    render :blank
  end
end
