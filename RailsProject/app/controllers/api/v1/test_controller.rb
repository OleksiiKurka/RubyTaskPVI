class Api::V1::TestController < ApplicationController

    #test auth
    def index
        @roles = Role.all
        render json: @roles
    end
end