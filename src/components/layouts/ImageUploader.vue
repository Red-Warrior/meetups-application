<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="backgroundImage"
      @click="resetImage($event)"
    >
      <span>{{ status }}</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="form-control-file"
        :disabled="loading"
        @change="changeImage"
      />
    </label>
  </div>
</template>

<script>
import { toasterResult } from '@/helpers/toasterResult';
import { withProgress } from '@/helpers/withProgress';

export default {
  name: 'ImageUploader',

  data() {
    return {
      loading: false,
    };
  },

  inject: {
    services: 'services',
  },

  props: {
    imageId: {
      default: null,
    },
  },

  model: {
    prop: 'imageId',
    event: 'change',
  },

  computed: {
    status() {
      if (!this.loading) {
        return this.currentImageId !== null ? 'Удалить изображение' : 'Загрузить изображение';
      } else {
        return 'Загрузка...';
      }
    },

    currentImageId() {
      return this.imageId;
    },

    backgroundImage() {
      return this.currentImageId ? `--bg-image: url('${this.services.getImageURL(this.currentImageId)}')` : null;
    },
  },

  methods: {
    async changeImage() {
      let imageFile = this.$refs.input.files[0];
      this.loading = true;

      return this.$emit('change', this.getNewId(imageFile));
    },

    resetImage(event) {
      if (this.imageId) {
        event.preventDefault();
        this.$refs.input.value = '';
        return this.$emit('change', null);
      }
    },

    async getNewId(value) {
      const newImage = new FormData();
      newImage.append('file', value);

      return toasterResult(
        await withProgress(
          this.$uploadImage(newImage).then(response => {
            this.loading = false;
            return response.result.id;
          })
        ),
        {
          successToast: 'Изображение загружено',
          errorToast: true,
        }
      );
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
