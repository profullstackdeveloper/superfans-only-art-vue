<style scoped>
.navbar-menu.is-active .navbar-end {
  width: 200px;
  margin: 0px auto;
  text-align: justify;
}
.navbar-item img {
  max-height: 150px;
  max-width: 150px;
  margin-right: 1rem;
  margin-left: 1rem;
}
.navbar-basic {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
@media (max-width: 1024px) {
  .navbar-basic {
    display: unset;
    justify-content: unset;
    width: unset;
  }
  .nav-hide {
    display: none !important;
  }
}
@media screen and (max-width: 768px) {
  .navbar-item img {
    max-height: 90px;
    max-width: 90px;
  }

  .nav-button {
    justify-content: center;
  }

  .nav-list-menu {
    padding-left: 3rem;
  }
}
.navbar-burger {
  position: absolute;
  right: 5%;
}
a.navbar-item:focus,
a.navbar-item:focus-within,
a.navbar-item:hover {
  background-color: transparent !important;
}
a.navbar-item:visited,
a.navbar-item:visited {
  background-color: transparent !important;
}
.navbar-burger span {
  width: 36px !important;
}
.navbar-burger span:nth-child(1) {
  top: calc(50% - 12px) !important;
}
.navbar-burger span:nth-child(3) {
  top: calc(50% + 10px) !important;
}
.navbar-burger.is-active span:nth-child(1) {
  transform: translateY(11px) rotate(45deg) !important;
}
.navbar-burger.is-active span:nth-child(3) {
  transform: translateY(-11px) rotate(-45deg) !important;
}
.navbar-burger span {
  left: calc(50% - 16px) !important;
}
</style>