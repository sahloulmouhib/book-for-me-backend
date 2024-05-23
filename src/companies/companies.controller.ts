import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedUser } from 'src/decorators/authentificated-user';
import { User } from 'src/users/user.entity';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImage } from '../decorators/upload-image.decorator';
import { AddCompanyImageDto } from './dtos/add-comany-image.dto';

@UseGuards(AuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private companyService: CompaniesService) {}

  @Post()
  createCompany(
    @Body() { availabilities, title, services, description }: CreateCompanyDto,
    @AuthenticatedUser() user: User,
  ) {
    return this.companyService.createCompany(
      user.id,
      title,
      description,
      availabilities,
      services,
    );
  }

  @Get('profile/:id')
  getCompanyProfile(@Param('id') id: string) {
    return this.companyService.getCompanyProfile(id);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async addOrUpdateCompanyImage(
    @UploadImage()
    image: Express.Multer.File,
    @Body() { companyId }: AddCompanyImageDto,
    @AuthenticatedUser() user: User,
  ) {
    return await this.companyService.addOrUpdateCompanyImage(
      companyId,
      image,
      user,
    );
  }
}
