class ToysController < ApplicationController
  # GET /toys
  # GET /toys.xml
  # GET /toys.json
  def index
    @toys = Toy.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render xml: @toys }
      format.json { render json: @toys }
    end
  end

  # GET /toys/1
  # GET /toys/1.xml
  # GET /toys/1.json
  def show
    @toy = Toy.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render xml: @toy }
      format.json { render json: @toy }
    end
  end

  # GET /toys/new
  def new
    @toy = Toy.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render xml: @toy }
      format.json { render json: @toy }
    end
  end

  # GET /toys/1/edit
  def edit
    @toy = Toy.find(params[:id])
  end

  # POST /toys
  # POST /toys.xml
  # POST /toys.json
  def create
    @toy = Toy.new(toy_params)

    respond_to do |format|
      if @toy.save
        format.html { redirect_to root_path(success: true), notice: 'Toy was successfully created.' }
        format.xml  { render xml: @toy, status: :created, location: @toy }
        format.json { render json: @toy, status: :created, location: @toy }
      else
        format.html { render action: "new", status: :unprocessable_entity }
        format.xml  { render xml: @toy.errors, status: :unprocessable_entity }
        format.json { render json: @toy.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /toys/1
  # PATCH/PUT /toys/1.xml
  # PATCH/PUT /toys/1.json
  def update
    @toy = Toy.find(params[:id])

    respond_to do |format|
      if @toy.update(toy_params)
        format.html { redirect_to root_path(success: true), notice: 'Toy was successfully updated.' }
        format.xml  { head :ok }
        format.json { render json: @toy }
      else
        format.html { render action: "edit", status: :unprocessable_entity }
        format.xml  { render xml: @toy.errors, status: :unprocessable_entity }
        format.json { render json: @toy.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /toys/1
  # DELETE /toys/1.xml
  # DELETE /toys/1.json
  def destroy
    @toy = Toy.find(params[:id])
    @toy.destroy

    respond_to do |format|
      format.html { redirect_to root_path(success: true), notice: 'Toy was successfully deleted.' }
      format.xml  { head :ok }
      format.json { head :no_content }
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def toy_params
      params.require(:toy).permit(:name, :user, :owner, :tag)
    end
end
