<% if (crud && type === 'rest') { %>import {Controller, Get, Post, Body, Query, Patch, Delete, Logger} from '@nestjs/common'<%
} else if (crud && type === 'microservice') { %>import {Controller} from '@nestjs/common'
import {MessagePattern, Payload} from '@nestjs/microservices'<%
} else { %>import {Controller} from '@nestjs/common'<%
} %>
import {<%= classify(name) %>Service} from './<%= name %>.service'<% if (crud) { %>
import {<%= singular(classify(name)) %>, Create<%= singular(classify(name)) %>, Update<%= singular(classify(name)) %>} from './<%= singular(name) %>.entity'<% } %>
import {FilterQuery} from '@mikro-orm/core'
import {ApiQuery} from '@nestjs/swagger'
import {UseValidation, UseClassSerializer, UUIDParam} from '@scrypt-swiss/nest'

<% if (type === 'rest') { %>@Controller('<%= dasherize(parentname) %>/<%= dasherize(name) %>')<% } else { %>@Controller()<% } %>
@UseClassSerializer()
@UseValidation()
export class <%= classify(name) %>Controller {
  readonly logger = new Logger(this.constructor.name)
  constructor(private readonly <%= lowercased(name) %>Service: <%= classify(name) %>Service) {}<% if (type === 'rest' && crud) { %>

  @Post()
  async create(@Body() create<%= singular(classify(name)) %>: Create<%= singular(classify(name)) %>): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.create(create<%= singular(classify(name)) %>)
  }

  @Get()
  @ApiQuery({name: 'query', required: false, type: 'object'})
  async findAll(@Query('query') query?: FilterQuery<<%= singular(classify(name)) %>>): Promise<Array<<%= singular(classify(name))%>>> {
    return this.<%= lowercased(name) %>Service.findAll(query)
  }

  @Get(':id')
  async findOne(@UUIDParam('id') id: string): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.findOne(id)
  }

  @Patch(':id')
  async update(@UUIDParam('id') id: string, @Body() update<%= singular(classify(name)) %>: Update<%= singular(classify(name)) %>): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.update(id, update<%= singular(classify(name)) %>)
  }

  @Patch()
  @ApiQuery({name: 'query', required: false, type: 'object'})
  async updateQuery(@Body() update<%= singular(classify(name)) %>: Update<%= singular(classify(name)) %>, @Query('query') query?: FilterQuery<<%= singular(classify(name)) %>>): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.update(query, update<%= singular(classify(name)) %>)
  }

  @Delete(':id')
  async remove(@UUIDParam('id') id: string): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.remove(id)
  }<% } else if (type === 'microservice' && crud) { %>

  @Delete()
  @ApiQuery({name: 'query', required: false, type: 'object'})
  async removeQuery(@Query('query') query?: FilterQuery<<%= singular(classify(name)) %>>): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.remove(query)
  }<% } else if (type === 'microservice' && crud) { %>

  @MessagePattern(Topic.CREATE_<%= singular(uppercased(name)) %>)
  async create(@Payload() create<%= singular(classify(name)) %>: Create<%= singular(classify(name)) %>): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.create(create<%= singular(classify(name)) %>)
  }

  @MessagePattern(Topic.FIND_ALL_<%= uppercased(name) %>)
  @ApiQuery({name: 'query', required: false, type: 'object'})
  async findAll(@Payload query?: FilterQuery<<%= singular(classify(name)) %>>): Promise<Array<<%= singular(classify(name)) %>>> {
    return this.<%= lowercased(name) %>Service.findAll(query)
  }

  @MessagePattern(Topic.FIND_ONE_<%= singular(uppercased(name)) %>)
  @ApiQuery({name: 'query', required: false, type: 'object'})
  async findOne(@Payload() id: string | FilterQuery<<%= singular(classify(name)) %>>): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.findOne(id)
  }

  @MessagePattern(Topic.UPDATE_<%= singular(uppercased(name)) %>)
  @ApiQuery({name: 'query', required: false, type: 'object'})
  async update(@Payload() id: string | FilterQuery<<%= singular(classify(name)) %>>, @Payload() update<%= singular(classify(name)) %>: Update<%= singular(classify(name)) %>): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.update(id, update<%= singular(classify(name)) %>)
  }

  @MessagePattern(Topic.DELETE_<%= singular(uppercased(name)) %>')
  @ApiQuery({name: 'query', required: false, type: 'object'})
  async remove(@Payload() id: string | FilterQuery<<%= singular(classify(name)) %>>): Promise<<%= singular(classify(name)) %>> {
    return this.<%= lowercased(name) %>Service.remove(id)
  }<% } %>
}
