class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      sign_in(user)
      # redirect_do
    else
      flash.now[:errors] = ["Invalid username or password"]
      # render
    end
  end

  def destroy
    sign_out
    # rediect_to
  end
end
