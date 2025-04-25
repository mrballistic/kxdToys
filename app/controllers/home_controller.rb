class HomeController < ApplicationController
  def index
    # Redirect to toys index page which will now handle the main functionality
    redirect_to toys_path
  end
end
