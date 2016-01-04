class Api::GroupsController < ApplicationController
  # This handles creating a new group, but not adding a user to a pre-existing group.
  #
  def create
    group = Group.create()
    group.members = User.where("id = ? OR id = ?", params[:id1], params[:id2])
    render :blank
  end
end
