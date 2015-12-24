class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      render :blank
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def index
    id = params[:id]
    if id == "" || !id
      render :blank
    else
      @messages = Message.where("recipient_id = #{id} AND read = false")
    end
  end

  def update
    message = Message.find(params[:id])
    message.read = true
    message.save!
    render :blank
  end

  private
  def message_params
    params.require(:message).permit(:type, :body, :sender_id, :recipient_id)
  end
end
