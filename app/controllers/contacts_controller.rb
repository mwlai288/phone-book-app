class ContactsController < ApplicationController

  # before_action :authenticate_user!

  def index
    @contacts = Contact.all

    render json: @contacts
  end

  def show
    @contact = Contact.find(params[:id])
    render json: @contact
  end

  def create
    @user = current_user
    @contact = @user.contacts.create(contact_params)

    if @user.save
      render json: @contact, status: :created, location: @contact
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  def update
    @contact = Contact.find(params[:id])

    if @contact.update(contact_params)
      render json: @contact
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @contact = Contact.find(params[:id]).delete

    render status: :ok
  end

  private

  def contact_params
    params.require(:contact).permit(:firstname, :lastname, :avatar, :phone, :email, :address, :group)
  end
  
end
