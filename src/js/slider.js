$(document).ready(function() {
  // ������������ ���� �� ��������
  $('.img_block img').click(function() {
    // �������� ����� ��������
    var imgAddr = $(this).attr(&quot;src&quot;);
    // ������ �������� SRC ��������, ������� � ������� ����.
    $('#img_big_block img').attr({src: imgAddr});
    // ���������� ������� ���������
    $('#img_big_block').fadeIn('slow');
  });
 
  // ������������ ���� �� ������� ��������
  $('#img_big_block').click(function() {
    $(this).fadeOut();
  });
});
 