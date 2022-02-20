<template>
  <div class="footer bg-pale-blue">
    <div class="d-flex flex-column justify-content-center" style="position: relative; z-index: 350">
      <span class="font my-5">Stay tuned!</span>
      <p>
        {{ $t("__stay_directions") }}
        <br />
        {{ $t("__stay_hint") }}
      </p>
      <div class="my-5 mx-5 mx-sm-0">
        <div class="d-flex justify-content-center flex-column flex-sm-row">
          <input
            type="text"
            style="border: none; padding: 10px 20px; border-radius: 8px;"
            :placeholder="$t('__email')"
          />
          <button
            type="submit"
            class="btn btn-primary fw-bold ms-0 ms-sm-5 mt-3 mt-sm-0 px-4 py-2"
            style="vertical-align: baseline; letter-spacing: 1px; border-radius: 8px;"
          >{{ $t("__join") }}</button>
        </div>
        <p class="mt-3" style="font-size: 14px;">
          {{ $t("__cancel") }}
          <strong>{{ $t("__here") }}</strong>
        </p>
      </div>
    </div>

    <div class="content py-3">
      <p class="m-0">
        © 2021 SyuanYu / Design by Clancy
        <span class="d-none d-sm-inline-block">| 個人練習作品，非商業用途</span>
      </p>
    </div>

    <img
      class="footer-img"
      style="max-height: 370px; width: 100%;"
      src="../assets/images/circle.png"
      alt="footer-img"
    />
    <img
      class="footer-img"
      style="left: -10px; bottom: 40px; z-index: 300;"
      src="../assets/images/Saly-14.png"
      alt="footer-img"
    />
  </div>
</template>

<style lang="scss" scoped>
.footer {
  .footer-img {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .font {
    font-family: Garamond;
    font-weight: bold;
    font-size: 36px;
  }
  ::placeholder {
    color: #737b7d;
  }
}

.content {
  position: relative;
  z-index: 200;
  bottom: 0;
  background-color: #2d334a;
  color: white;
  font-family: ui-serif, Georgia, serif;
  font-size: 14px;
}
</style>
