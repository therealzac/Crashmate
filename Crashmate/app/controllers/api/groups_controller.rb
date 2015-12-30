class Api::GroupsController < ApplicationController
  # This handles creating a new group, but not adding a user to a pre-existing group.
  # 
  def create
    group = Group.create()
    group.members = User.where("id = ? OR id = ?", params[:id1], params[:id2])
    render :blank
  end

  private
  # This isn't necessary anymore. Tweak or remove this.
  def group_params
    params.require(:group).permit(group_memberships_attributes: [:user_id, :user_id])
  end
end
