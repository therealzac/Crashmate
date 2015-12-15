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
      flash.now[:errors] = ["Invalid username or password"]
      render :show
    end
  end

  def destroy
    sign_out
    render :blank
  end
end
