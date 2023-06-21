const {ALLOWED_DECODERS, MAX_FILE_SIZE_IN_MB} = require('../constants')

class UserFixableAction extends Error {

}

class ImageWrongAspectRatio extends UserFixableAction {
  constructor() {
    super('Image must be 16x9 aspect ratio');
  }
}

class WrongFileType extends UserFixableAction {
  constructor() {
    super(`Wrong file type, must be ${ALLOWED_DECODERS.map(s => s.toUpperCase()).join(' or ')}`);
  }
}

class ImageFilesizeTooLarge extends UserFixableAction {
  constructor() {
    super(`Image too large, max allowed size is ${MAX_FILE_SIZE_IN_MB}MB`);
  }
}

class WrongScheduleValue extends UserFixableAction {
  constructor() {
    super('Cannot handle this schedule type')
  }
}


module.exports = {
  UserFixableAction, 
  ImageWrongAspectRatio,
  WrongFileType,
  ImageFilesizeTooLarge,
  WrongScheduleValue
}