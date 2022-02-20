export function popupTemplate(list) {
  return `
  <div class="card border-0">
    <div class="card-body p-0">
      <h6 class="card-title border-bottom pb-2 fw-bolder">
        ${list.ScenicSpotName || list.HotelName}
      </h6>
      <p class="card-subtitle m-0 text-muted mt-1">
        ${list.OpenTime || list.Address || ""}
      </p>
      <a
      href="https://www.google.com.tw/maps/place/${list.ScenicSpotName}"
      class="btn btn-primary text-dark btn-sm mt-1" target="_blank" style="width: 100%;">
      前往導航
      </a>
    </div>
  </div>`;
}
